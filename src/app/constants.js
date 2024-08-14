export const paginationOptions = [20, 30, 40, 50];
export const initialPageLimit = 20;

export const colors = {
    primary: "#5578EB", // Elegant blue with a touch of depth
    primaryAlt: "#3355D1", // Darker blue for contrast
    secondary: "#FF8C42", // Warm orange for vibrant accents
    secondaryText: "#FFA15E", // Softer orange for text
    tertiary: "#FDCB58", // Soft gold for highlights
    body: "#6E6E6E", // Neutral dark gray for body text
    bgPrimary: "#F0F4FA", // Soft light blue for backgrounds
    bgSecondary: "#E3EDF7", // Pale blue-gray for secondary backgrounds
    heading: "#222831", // Deep gray for headings
    gradient: "linear-gradient(135deg, #5578EB 0%, #42A5F5 100%)", // Gradient with smooth blue transition
    shadowLight: "0px 10px 50px 0px rgba(34, 40, 49, 0.1)",  // Light shadow with a subtle gray tone
    shadowDark: "0 10px 50px 0 rgba(34, 40, 49, .2)", // Darker shadow for depth
    bgGradient: "linear-gradient(76deg, #5578EB 0%, #3355D1 100%)", // Enhanced background gradient with elegant blues
};


export const stages = [
    {
        id: 1,
        title: 'الصف الأول الثانوي',
        imageUrl: '/levels/level1.webp'
    },
    {
        id: 2,
        title: 'الصف الثاني الثانوي',
        imageUrl: '/levels/level2.webp'
    },
    {
        id: 3,
        title: 'الصف الثالث الثانوي',
        imageUrl: '/levels/level3.webp'
    },
];


export const simpleModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    overflow: "auto",
    width: {
        xs: '95%',
        sm: '80%',
        md: '60%',
    },
    maxWidth: {
        md: '600px',
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: {
        xs: 2,
        sm: 3,
        md: 4
    },
};
