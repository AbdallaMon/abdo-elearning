const url = process.env.NEXT_PUBLIC_URL

export async function getLessonsByCategoryId(categoryId, courseId, isReview) {
    try {
        const response = await fetch(url + "/api/student/courses/lessons?categoryId=" + `${categoryId}&courseId=${courseId}&isReview=${isReview}`);

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        const res = await response.json();

        return res.data;

    } catch (e) {
        console.error("Failed to fetch lessons:", e);
        return null;
    }
}
