"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    TextField,
    Modal,
    Box, Card, CardContent,
} from "@mui/material";
import { useToastContext } from "@/providers/ToastLoadingProvider";
import FilterSelect from "@/app/UiComponents/FilterSelect";
import QuestionEditor from "@/app/UiComponents/FormComponents/Forms/QuestionEditor";
import {simpleModalStyle} from "@/app/constants";
import {handleRequestSubmit} from "@/helpers/functions/handleSubmit";

const CreateQuizPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [associationType, setAssociationType] = useState('course');
    const [courseId, setCourseId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [questions, setQuestions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCat, setFilteredCat] = useState(null);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errors, setErrors] = useState({});
    const { setLoading } = useToastContext();
    const [currentQuestion, setCurrentQuestion] = useState(null);  // New state for the current question in the modal
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control the modal

    const fetchAllCoursesByCatId = async () => {
        setLoadingCourses(true);
        const response = await fetch(`/api/indexes?index=course&filters={"categoryId":${filteredCat}}`);
        const result = await response.json();
        setLoadingCourses(false);
        return { data: result.data };
    };

    const fetchAllCategories = async () => {
        const response = await fetch(`/api/indexes?index=category`);
        const result = await response.json();
        setLoadingCategories(false);
        return { data: result.data };
    };

    useEffect(() => {
        async function fetchCoursesByCatId() {
            const responseCourses = await fetchAllCoursesByCatId();
            setCourses(responseCourses.data);
        }
        fetchCoursesByCatId();
    }, [filteredCat]);

    useEffect(() => {
        async function fetchFilterData() {
            const responseCategories = await fetchAllCategories();
            setCategories(responseCategories.data);
        }
        fetchFilterData();
    }, []);

    const handleAssociationChange = (event) => {
        const type = event.target.value;
        setAssociationType(type);
        setCourseId("");
        setCategoryId("");
        setErrors(prev => ({ ...prev, courseId: false, categoryId: false }));
    };

    const handleCourseChange = (event) => {
        const id = event.target.value;
        setCourseId(id);
        setErrors(prev => ({ ...prev, courseId: !id }));
    };

    const handleCategoryChange = (event) => {
        const id = event.target.value;
        setCategoryId(id);
        setErrors(prev => ({ ...prev, categoryId: !id }));
    };

    const handleCatChange = (event) => {
        const id = event.target.value;
        setFilteredCat(id || null);
    };

    const handleAddQuestion = () => {
        setCurrentQuestion({ title: "", questionType: "TEXT", questionChoices: [], correctChoice: null, order: questions.length + 1 });
        setIsModalOpen(true);
    };

    const handleSaveQuestion = (index, updatedQuestion) => {
        if (index !== null) {
            setQuestions(prevQuestions => prevQuestions.map((q, i) => (i === index ? updatedQuestion : q)));
        } else {
            setQuestions(prevQuestions => [...prevQuestions, updatedQuestion]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteQuestion = (index) => {
        setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
    };

    const handleEditQuestion = (index) => {
        setCurrentQuestion({ ...questions[index], index });
        setIsModalOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!title) newErrors.title = "العنوان مطلوب";
        if (!description) newErrors.description = "الوصف مطلوب";
        if (!courseId && associationType === 'course') newErrors.courseId = "يرجى اختيار وحدة";
        if (!categoryId && associationType === 'category') newErrors.categoryId = "يرجى اختيار فئة";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const quizData = {
            title,
            description,
            courseId: associationType === 'course' ? parseInt(courseId) : undefined,
            categoryId: associationType === 'category' ? parseInt(categoryId) : undefined,
            questions: questions,
        };

        const response = await handleRequestSubmit(
              quizData,
              setLoading,
              "admin/quizzes/",
              false,
              "Creating quiz..."
        );

        if (response.status === 200) {
            setTitle("");
            setDescription("");
            setCourseId("");
            setCategoryId("");
            setQuestions([]);
            setErrors({});
        }
    };

    return (
          <div className="p-4 max-w-3xl mx-auto">
              <Typography variant="h4" gutterBottom>إنشاء الاختبار</Typography>
              <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <FormControl fullWidth>
                              <InputLabel>ارتباط مع</InputLabel>
                              <Select
                                    value={associationType}
                                    onChange={handleAssociationChange}
                              >
                                  <MenuItem value="course">وحدة</MenuItem>
                                  <MenuItem value="category">منهج</MenuItem>
                              </Select>
                          </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                          <FormControl fullWidth error={!!errors.courseId || !!errors.categoryId}>
                              {associationType === 'course' ? (
                                    <div className={"flex gap-2  flex-row-reverse"}>
                                        <FilterSelect
                                              label="الوحدة"
                                              options={courses?.map(course => ({ name: course.title, id: course.id }))}
                                              value={courseId}
                                              onChange={handleCourseChange}
                                              loading={loadingCourses}
                                        />
                                        <FilterSelect
                                              label="فلتر الوحدة بالمنهج"
                                              options={categories}
                                              value={filteredCat}
                                              onChange={handleCatChange}
                                              loading={loadingCategories}
                                        />
                                    </div>
                              ) : (
                                    <FilterSelect
                                          label="المنهج"
                                          options={categories}
                                          value={categoryId}
                                          onChange={handleCategoryChange}
                                          loading={loadingCategories}
                                    />
                              )}
                              {(errors.courseId || errors.categoryId) && <FormHelperText>{errors.courseId || errors.categoryId}</FormHelperText>}
                          </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                          <TextField
                                label="العنوان"
                                fullWidth
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setErrors(prev => ({ ...prev, title: !e.target.value }));
                                }}
                                error={!!errors.title}
                                helperText={errors.title}
                                required
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                                label="الوصف"
                                multiline
                                rows={4}
                                fullWidth
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setErrors(prev => ({ ...prev, description: !e.target.value }));
                                }}
                                error={!!errors.description}
                                helperText={errors.description}
                                required
                          />
                      </Grid>

                      <Grid item xs={12}>
                          <Typography variant="h6">الأسئلة</Typography>
                          {questions.map((question, qIndex) => (
                                <div key={qIndex} className="mb-4">
                                    <Card variant="outlined" className="mb-2">
                                        <CardContent>
                                            <Typography variant="h6">{question.title}</Typography>
                                            <Button variant="contained" color="primary" onClick={() => handleEditQuestion(qIndex)}>
                                                تعديل
                                            </Button>
                                            <Button variant="contained" color="error" onClick={() => handleDeleteQuestion(qIndex)}>
                                                حذف
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                          ))}
                      </Grid>
                  </Grid>
                  <Button
                        variant="contained"
                        color="primary"
                        className="mt-4"
                        onClick={handleAddQuestion}
                  >
                      إضافة سؤال آخر
                  </Button>

                  <Button
                        variant="contained"
                        color="success"
                        className="mt-4 ml-2"
                        type="submit"
                  >
                      إنشاء الاختبار
                  </Button>
              </form>

              {/* Modal for editing/adding questions */}
              <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <Box sx={simpleModalStyle}>
                      <QuestionEditor
                            question={currentQuestion}
                            index={currentQuestion?.index ?? null}
                            onSave={handleSaveQuestion}
                            onClose={() => setIsModalOpen(false)}
                      />
                  </Box>
              </Modal>
          </div>
    );
};


export default CreateQuizPage;
