import { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Card,
    CardContent,
} from "@mui/material";
import { MdClose as CloseIcon, MdDeleteForever as DeleteIcon } from "react-icons/md";

const QuestionEditor = ({ question, index, onSave, onClose }) => {
    // Ensure sectionQuestions is initialized if the question type is SECTION
    const [localQuestion, setLocalQuestion] = useState({
        ...question,
        sectionQuestions: question.sectionQuestions || [],
        story: question.story || "",  // Add story field for section
        correctAnswerBoolean: question.correctAnswerBoolean ?? true,  // Default to true
    });
    const handleQuestionChange = (field, value) => {
        setLocalQuestion(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleChoiceChange = (cIndex, value, isSection, sIndex) => {
        if (isSection) {
            const updatedSectionQuestions = localQuestion.sectionQuestions.map((sq, si) =>
                  si === sIndex
                        ? {
                            ...sq,
                            questionChoices: sq.questionChoices.map((choice, j) =>
                                  j === cIndex ? { ...choice, title: value } : choice
                            ),
                        }
                        : sq
            );
            setLocalQuestion(prev => ({ ...prev, sectionQuestions: updatedSectionQuestions }));
        } else {
            const updatedChoices = localQuestion.questionChoices.map((choice, idx) =>
                  idx === cIndex ? { ...choice, title: value } : choice
            );
            setLocalQuestion(prev => ({ ...prev, questionChoices: updatedChoices }));
        }
    };

    const handleCorrectChoiceChange = (value, isSection, sIndex) => {
        if (isSection) {
            const updatedSectionQuestions = localQuestion.sectionQuestions.map((sq, si) =>
                  si === sIndex ? { ...sq, correctChoice: value } : sq
            );
            setLocalQuestion(prev => ({ ...prev, sectionQuestions: updatedSectionQuestions }));
        } else if (localQuestion.questionType === "TRUE_FALSE") {
            setLocalQuestion(prev => ({
                ...prev,
                correctAnswerBoolean: value === 1,
            }));
        } else {
            setLocalQuestion(prev => ({
                ...prev,
                correctChoice: value,
            }));
        }
    };
    const handleAddSectionQuestion = () => {
        setLocalQuestion(prev => ({
            ...prev,
            sectionQuestions: [
                ...prev.sectionQuestions,
                { title: "", questionChoices: [], correctChoice: null },
            ],
        }));
    };

    const handleDeleteSectionQuestion = (sIndex) => {
        const updatedSections = localQuestion.sectionQuestions.filter((_, si) => si !== sIndex);
        setLocalQuestion(prev => ({ ...prev, sectionQuestions: updatedSections }));
    };

    const handleSectionChoiceCountChange = (sIndex, count) => {
        const updatedSectionQuestions = localQuestion.sectionQuestions.map((sq, si) =>
              si === sIndex
                    ? {
                        ...sq,
                        questionChoices: Array.from({ length: count }, (_, idx) => sq.questionChoices[idx] || { title: "", correct: false }),
                    }
                    : sq
        );
        setLocalQuestion(prev => ({ ...prev, sectionQuestions: updatedSectionQuestions }));
    };

    const handleSave = () => {
        // Ensure correct is set properly for all choices
        const updatedQuestion = {
            ...localQuestion,
            questionChoices: localQuestion.questionType === "MULTIPLE_CHOICE"
                  ? localQuestion.questionChoices?.map((choice, idx) => ({
                      ...choice,
                      correct: localQuestion.correctChoice === idx,
                  }))
                  : undefined,
            sectionQuestions: localQuestion.sectionQuestions?.map((sq) => ({
                ...sq,
                questionChoices: sq.questionChoices.map((choice, idx) => ({
                    ...choice,
                    correct: sq.correctChoice === idx,
                })),
            })),
        };
        onSave(index, updatedQuestion);
    };

    return (
          <div>
              <div className="flex justify-between mb-4">
                  <Typography variant="h6">{index !== null ? "تعديل السؤال" : "إضافة سؤال جديد"}</Typography>
                  <IconButton onClick={onClose}>
                      <CloseIcon />
                  </IconButton>
              </div>
              <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>نوع السؤال</InputLabel>
                  <Select
                        value={localQuestion.questionType}
                        onChange={(e) => handleQuestionChange("questionType", e.target.value)}
                        required
                  >
                      <MenuItem value="TEXT">نص</MenuItem>
                      <MenuItem value="MULTIPLE_CHOICE">اختيار من متعدد</MenuItem>
                      <MenuItem value="SECTION">قسم</MenuItem>
                      <MenuItem value="TRUE_FALSE">صحيح أو خطأ</MenuItem>
                  </Select>
              </FormControl>
              <TextField
                    label={`ترتيب السؤال`}
                    type="number"
                    value={localQuestion.order}
                    onChange={(e) => handleQuestionChange("order", parseInt(e.target.value, 10))}
                    fullWidth
                    sx={{ mb: 2 }}
                    required
              />
              <TextField
                    label="عنوان السؤال"
                    fullWidth
                    value={localQuestion.title}
                    onChange={(e) => handleQuestionChange("title", e.target.value)}
                    required
                    sx={{ mb: 1 }}
              />

              {localQuestion.questionType === "MULTIPLE_CHOICE" && (
                    <>
                        <TextField
                              label="عدد الخيارات"
                              type="number"
                              fullWidth
                              value={localQuestion.questionChoices.length}
                              onChange={(e) =>
                                    handleQuestionChange("questionChoices", Array.from({ length: parseInt(e.target.value, 10) }, (_, idx) => localQuestion.questionChoices[idx] || { title: "", correct: false }))
                              }
                              required
                              sx={{ mb: 1 }}
                        />
                        {localQuestion.questionChoices.map((choice, cIndex) => (
                              <div key={cIndex} className="flex items-center mt-1">
                                  <TextField
                                        label={`الخيار ${cIndex + 1}`}
                                        value={choice.title}
                                        onChange={(e) => handleChoiceChange(cIndex, e.target.value, false)}
                                        required
                                        className="mr-2"
                                        fullWidth
                                  />
                                  <RadioGroup
                                        name={`correctChoice-${index}`}
                                        value={localQuestion.correctChoice}
                                        onChange={(e) => handleCorrectChoiceChange(parseInt(e.target.value, 10), false)}
                                  >
                                      <FormControlLabel
                                            value={cIndex}
                                            control={<Radio />}
                                            label="الإجابة الصحيحة"
                                      />
                                  </RadioGroup>
                              </div>
                        ))}
                    </>
              )}

              {localQuestion.questionType === "TRUE_FALSE" && (
                    <FormControl component="fieldset">
                        <RadioGroup
                              name={`correctChoice-${index}`}
                              value={localQuestion.correctAnswerBoolean ? 1 : 0}
                              onChange={(e) => handleCorrectChoiceChange(parseInt(e.target.value, 10), false)}
                        >
                            <FormControlLabel value={1} control={<Radio />} label="صحيح" />
                            <FormControlLabel value={0} control={<Radio />} label="خطأ" />
                        </RadioGroup>
                    </FormControl>
              )}

              {localQuestion.questionType === "SECTION" && (
                    <>
                        <TextField
                              label="النص / القصة"
                              fullWidth
                              value={localQuestion.story}
                              onChange={(e) => handleQuestionChange("story", e.target.value)}
                              multiline
                              rows={4}
                              required
                              sx={{ mb: 2 }}
                        />

                        {localQuestion.sectionQuestions.map((sectionQuestion, sqIndex) => (
                              <Card key={sqIndex} variant="outlined" sx={{ mt: 2 }}>
                                  <CardContent>
                                      <TextField
                                            label={`عنوان السؤال الفرعي ${sqIndex + 1}`}
                                            fullWidth
                                            value={sectionQuestion.title}
                                            onChange={(e) => handleQuestionChange("sectionQuestions", localQuestion.sectionQuestions.map((sq, si) => si === sqIndex ? { ...sq, title: e.target.value } : sq))}
                                            required
                                            sx={{ mb: 1 }}
                                      />
                                      <TextField
                                            label="عدد الخيارات"
                                            type="number"
                                            fullWidth
                                            value={sectionQuestion.questionChoices.length}
                                            onChange={(e) =>
                                                  handleSectionChoiceCountChange(sqIndex, parseInt(e.target.value, 10))
                                            }
                                            required
                                            sx={{ mb: 1 }}
                                      />
                                      {sectionQuestion.questionChoices.map((choice, cIndex) => (
                                            <div key={cIndex} className="flex items-center mt-1">
                                                <TextField
                                                      label={`الخيار ${cIndex + 1}`}
                                                      value={choice.title}
                                                      onChange={(e) => handleChoiceChange(cIndex, e.target.value, true, sqIndex)}
                                                      required
                                                      className="mr-2"
                                                      fullWidth
                                                />
                                                <RadioGroup
                                                      name={`correctChoice-${sqIndex}`}
                                                      value={sectionQuestion.correctChoice}
                                                      onChange={(e) => handleCorrectChoiceChange(parseInt(e.target.value, 10), true, sqIndex)}
                                                >
                                                    <FormControlLabel
                                                          value={cIndex}
                                                          control={<Radio />}
                                                          label="الإجابة الصحيحة"
                                                    />
                                                </RadioGroup>
                                            </div>
                                      ))}
                                      <Button variant="contained" color="error" onClick={() => handleDeleteSectionQuestion(sqIndex)}>
                                          حذف السؤال الفرعي
                                      </Button>
                                  </CardContent>
                              </Card>
                        ))}
                        <Button variant="contained" onClick={handleAddSectionQuestion}>
                            إضافة سؤال إلى القسم
                        </Button>
                    </>
              )}

              <div className="mt-4">
                  <Button variant="contained" color="primary" onClick={handleSave}>
                      {index !== null ? "حفظ التعديلات" : "إضافة السؤال"}
                  </Button>
              </div>
          </div>
    );
};

export default QuestionEditor;
