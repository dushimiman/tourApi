import  Mongoose  from "mongoose";
const tourSchema = new Mongoose.Schema({

    title: {
  
      type: String,
  
      required: true,
  
    },
  
    seats: Number,
  
    available: Number,
  
    images: [
  
      {
  
        type: String,
  
      },
  
    ],
  
    description: String,
  
    dateScheduled: Date,
  
    dueDate: Date,
  
    phone: String,
  
    price: Number,
  
    tripDescription: String,
  
    
  
  });
  
  const Tour = Mongoose.model("Tour", tourSchema);

 

  export default Tour;  