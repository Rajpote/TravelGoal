import toast from "react-hot-toast";
import api from "./Axios";

const uploadImageService = async (file, setLoading) => {
   try {
      setLoading(true);
      const { data } = await api.post("/upload", file);
      setLoading(false);
      toast.success("File uploaded successFully");
      return data;
   } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
   }
};

export { uploadImageService };
