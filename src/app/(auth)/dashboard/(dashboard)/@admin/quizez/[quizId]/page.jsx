"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    Modal,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import { MdDeleteForever as DeleteIcon, MdEdit as EditIcon } from "react-icons/md";
import { simpleModalStyle } from "@/app/constants";
import { handleRequestSubmit } from "@/helpers/functions/handleSubmit";
import {useToastContext} from "@/providers/ToastLoadingProvider";

const QuizPage = ({ params: { quizId } }) => {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // "edit", "delete", "add"
    const [newQuestionType, setNewQuestionType] = useState("");
    const [rerender,setRerender]=useState(false)
const {setLoading:setSubmitLoading}=useToastContext()
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/admin/quizzes/${quizId}`);
                const result = await response.json();
                if (result.status === 200) {
                    setQuiz(result.data);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId,rerender]);

    const handleOpenModal = (type, question = null) => {
        setModalType(type);
        setSelectedQuestion(question);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedQuestion(null);
    };

    const handleEditQuestion = async () => {
        const response = await handleRequestSubmit(selectedQuestion, setSubmitLoading, `/admin/quizzes/${quizId}/${selectedQuestion.id}`, false, "جاري التحديث", false, "PUT");
        if (response.status === 200) {
            handleCloseModal();
            setRerender((render)=>!render)
        }
    };

    const handleDeleteQuestion = async () => {
        const response = await handleRequestSubmit({}, setSubmitLoading, `/admin/quizzes/${quizId}/${selectedQuestion.id}`, false, "جاري الحذف", false, "DELETE");
        if (response.status === 200) {
            handleCloseModal();
            setRerender((render)=>!render)

        }
    };

    const handleAddQuestion = async () => {
        const response = await handleRequestSubmit(selectedQuestion ,setSubmitLoading, `/admin/quizzes/${quizId}`, false, "جاري الانشاء", false, "POST");
        if (response.status === 200) {
            handleCloseModal();
            setRerender((render)=>!render)

        }
    };

    const renderQuestionForm = (question) => {
        const isSection = question?.questionType === "SECTION";
        const isTrueFalse = question?.questionType === "TRUE_FALSE";

        // Helper function to find the correct choice index
        const findCorrectChoiceIndex = (choices) => {
            return choices.findIndex(choice => choice.correct);
        };

        return (
              <Box sx={{ p: 2 }}>
                  <TextField
                        label="عنوان السؤال"
                        fullWidth
                        value={question?.title || ""}
                        onChange={(e) => setSelectedQuestion({ ...question, title: e.target.value })}
                        sx={{ mb: 2 }}
                  />
                  {isSection && (
                        <>
                            <TextField
                                  label="النص / القصة"
                                  fullWidth
                                  value={question?.questionText || ""}
                                  onChange={(e) => setSelectedQuestion({ ...question, questionText: e.target.value })}
                                  sx={{ mb: 2 }}
                                  multiline
                                  rows={3}
                            />
                            {question?.sectionQuestions?.map((sq, index) => (
                                  <Card key={index} sx={{ p: 2, mb: 2 }}>
                                      <TextField
                                            label={`عنوان السؤال الفرعي ${index + 1}`}
                                            fullWidth
                                            value={sq.title}
                                            onChange={(e) =>
                                                  setSelectedQuestion({
                                                      ...question,
                                                      sectionQuestions: question.sectionQuestions.map((s, i) =>
                                                            i === index ? { ...s, title: e.target.value } : s
                                                      ),
                                                  })
                                            }
                                            sx={{ mb: 1 }}
                                      />
                                      <Typography variant="body2">نوع السؤال: اختيار من متعدد</Typography>
                                      <TextField
                                            label="عدد الخيارات"
                                            type="number"
                                            fullWidth
                                            value={sq.questionChoices.length}
                                            onChange={(e) =>
                                                  setSelectedQuestion({
                                                      ...question,
                                                      sectionQuestions: question.sectionQuestions.map((s, i) =>
                                                            i === index
                                                                  ? {
                                                                      ...s,
                                                                      questionChoices: Array.from(
                                                                            { length: parseInt(e.target.value, 10) },
                                                                            (_, idx) => s.questionChoices[idx] || { title: "", correct: false }
                                                                      ),
                                                                  }
                                                                  : s
                                                      ),
                                                  })
                                            }
                                            sx={{ mb: 1 }}
                                      />
                                      {sq.questionChoices.map((choice, cIndex) => (
                                            <div key={cIndex} className="flex items-center mt-1">
                                                <TextField
                                                      label={`الخيار ${cIndex + 1}`}
                                                      value={choice.title}
                                                      onChange={(e) =>
                                                            setSelectedQuestion({
                                                                ...question,
                                                                sectionQuestions: question.sectionQuestions.map((s, i) =>
                                                                      i === index
                                                                            ? {
                                                                                ...s,
                                                                                questionChoices: s.questionChoices.map((c, j) =>
                                                                                      j === cIndex ? { ...c, title: e.target.value } : c
                                                                                ),
                                                                            }
                                                                            : s
                                                                ),
                                                            })
                                                      }
                                                      sx={{ mr: 2 }}
                                                      fullWidth
                                                />
                                                <RadioGroup
                                                      name={`correctChoice-${index}`}
                                                      value={sq.correctChoice !== undefined ? sq.correctChoice : findCorrectChoiceIndex(sq.questionChoices)}
                                                      onChange={(e) =>
                                                            setSelectedQuestion({
                                                                ...question,
                                                                sectionQuestions: question.sectionQuestions.map((s, i) =>
                                                                      i === index
                                                                            ? {
                                                                                ...s,
                                                                                correctChoice: parseInt(e.target.value, 10),
                                                                                questionChoices: s.questionChoices.map((c, j) => ({
                                                                                    ...c,
                                                                                    correct: j === parseInt(e.target.value, 10),
                                                                                }))
                                                                            }
                                                                            : s
                                                                ),
                                                            })
                                                      }
                                                >
                                                    <FormControlLabel
                                                          value={cIndex}
                                                          control={<Radio />}
                                                    />
                                                </RadioGroup>
                                   
                                            </div>
                                      ))}
                                  </Card>
                            ))}
                        </>
                  )}
                  {!isSection && question?.questionType === "MULTIPLE_CHOICE" && (
                        <>
                            <TextField
                                  label="عدد الخيارات"
                                  type="number"
                                  fullWidth
                                  value={question?.questionChoices.length || 0}
                                  onChange={(e) =>
                                        setSelectedQuestion({
                                            ...question,
                                            questionChoices: Array.from(
                                                  { length: parseInt(e.target.value, 10) },
                                                  (_, idx) => question.questionChoices[idx] || { title: "", correct: false }
                                            ),
                                        })
                                  }
                                  sx={{ mb: 2 }}
                            />
                            {question?.questionChoices?.map((choice, index) => (
                                  <div key={index} className="flex items-center mt-1">
                                      <TextField
                                            label={`الخيار ${index + 1}`}
                                            value={choice.title}
                                            onChange={(e) =>
                                                  setSelectedQuestion({
                                                      ...question,
                                                      questionChoices: question.questionChoices.map((c, i) =>
                                                            i === index ? { ...c, title: e.target.value } : c
                                                      ),
                                                  })
                                            }
                                            sx={{ mr: 2 }}
                                            fullWidth
                                      />
                                      <RadioGroup
                                            name={`correctChoice`}
                                            value={findCorrectChoiceIndex(question.questionChoices)}
                                            onChange={(e) =>
                                                  setSelectedQuestion({
                                                      ...question,
                                                      correctChoice: parseInt(e.target.value, 10),
                                                      questionChoices: question.questionChoices.map((c, i) => ({
                                                          ...c,
                                                          correct: i === parseInt(e.target.value, 10)
                                                      }))
                                                  })
                                            }
                                      >
                                          <FormControlLabel value={index} control={<Radio />}  />
                                      </RadioGroup>
                                  </div>
                            ))}
                        </>
                  )}
                  {!isSection && isTrueFalse && (
                        <FormControl component="fieldset">
                            <RadioGroup
                                  name={`correctChoice-${question.id}`}
                                  value={question.correctAnswerBoolean ? 1 : 0}
                                  onChange={(e) =>
                                        setSelectedQuestion({
                                            ...question,
                                            correctAnswerBoolean: e.target.value === "1" // true if "True" is selected, false if "False" is selected
                                        })
                                  }
                            >
                                <FormControlLabel value={1} control={<Radio />} label="True" />
                                <FormControlLabel value={0} control={<Radio />} label="False" />
                            </RadioGroup>
                        </FormControl>
                  )}
              </Box>
        );
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
          <div className="p-4 max-w-3xl mx-auto">
              <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
              <Typography variant="h6" gutterBottom>{quiz.course ? quiz.course.title : quiz.category?.name}</Typography>

              {quiz.questions.map((question, index) => (
                    <Card key={index} variant="outlined" className="mb-4">
                        <CardContent>
                            <Typography variant="h6">{question.title}</Typography>
                            <Typography variant="body2">{question.questionText}</Typography>
                            <IconButton color="primary" onClick={() => handleOpenModal("edit", question)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleOpenModal("delete", question)}>
                                <DeleteIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
              ))}

              <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal("add")}
              >
                  إضافة سؤال جديد
              </Button>

              <Modal open={modalOpen} onClose={handleCloseModal}>
                  <Box sx={{ ...simpleModalStyle }}>
                      {modalType === "edit" || modalType === "add" ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    {modalType === "edit" ? "تحرير السؤال" : "إضافة سؤال جديد"}
                                </Typography>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>نوع السؤال</InputLabel>
                                    <Select
                                          value={selectedQuestion?.questionType || newQuestionType}
                                          onChange={(e) =>
                                                modalType === "edit"
                                                      ? setSelectedQuestion({ ...selectedQuestion, questionType: e.target.value })
                                                      : setNewQuestionType(e.target.value)
                                          }
                                          required
                                    >
                                        <MenuItem value="TEXT">نص</MenuItem>
                                        <MenuItem value="MULTIPLE_CHOICE">اختيار من متعدد</MenuItem>
                                        <MenuItem value="SECTION">قسم</MenuItem>
                                        <MenuItem value="TRUE_FALSE">صحيح أو خطأ</MenuItem>
                                    </Select>
                                </FormControl>

                                {renderQuestionForm(selectedQuestion || { questionType: newQuestionType })}

                                <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={modalType === "edit" ? handleEditQuestion : handleAddQuestion}
                                >
                                    {modalType === "edit" ? "تحديث السؤال" : "إضافة السؤال"}
                                </Button>
                            </>
                      ) : modalType === "delete" ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    هل أنت متأكد من حذف هذا السؤال؟
                                </Typography>
                                <Button variant="contained" color="error" onClick={handleDeleteQuestion}>
                                    حذف
                                </Button>
                                <Button variant="contained" onClick={handleCloseModal}>
                                    إلغاء
                                </Button>
                            </>
                      ) : null}
                  </Box>
              </Modal>
          </div>
    );
};

export default QuizPage;
