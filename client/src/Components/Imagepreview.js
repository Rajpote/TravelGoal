export const Imagepreview = ({ image, name }) => {
   return (
      <div className="w-32 mt-2 h-32 p-2 bg-main border border-border rounded">
         <img src={image ? image : "/image/user.png"} alt={name} className="w-full h-full object-cover rounded bg-white" />
      </div>
   );
};
