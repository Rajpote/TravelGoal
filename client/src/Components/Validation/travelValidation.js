import * as yup from "yup";

const ReviewValidation = yup.object().shape({
   comment: yup.string().required("Comment is required").max(150, "Comment should be less than 150 characters"),
   rating: yup
      .number()
      .typeError("Select a rating") 
      .required("Select a rating")
      .max(5, "Rating should be at most 5"), // Assuming ratings go up to 5
});

const travelValidation = yup.object().shape({
   name: yup.string().required("Name is required").trim().max(50, "Name should be less than 50 characters"),
   time: yup.number().required("Time is required"),
   year: yup.number().required("Year is required"),
   category: yup.string().required("Please select a category"),
   desc: yup.string().required("please enter the travel description").max(400, "desctiption must br less then 400 characters"),
});

export { ReviewValidation, travelValidation };
