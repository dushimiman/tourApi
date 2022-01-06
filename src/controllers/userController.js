import UserInfos from "../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth";
import BookInfos from "../models/book";
import TourInfos from "../models/tour";
import sendSms from "../helpers/sendSms";
import user from "../models/user";
class UserController{
  
    static async createUser(req, res) {
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword;
       ; const user = await UserInfos.create(req.body);
        if (!user) {
          return res.status(404).json({ error: "user not registered" });
        }
        return res
          .status(200)
          .json({ message: "User created successfully", data: user })
      }
     

    static async getallUser(req,res){
        const users = await UserInfos.find(req.body);
        if (!users){
            return res.status(400).json({error:"user not registerd"});
        }
        return res .status(200).json({message:"user is found",data: users});
    }

    static async getOneUser(req,res){
        const users = await UserInfos.findById(req.params.id);
        if (!users){
            return res.status(400).json({error:"user not registerd"});
            
        }
        return res .status(200).json({message:"user is found",data: users});
    }
    static async deleteOneUser(req,res){
        const users = await UserInfos.findByIdAndDelete(req.params.id);
        if (!users){
            return res.status(400).json({error:"user not deleted"});
            
        }

        return res .status(200).json({message:"user is deleted"
    });

    } 
    static async userLogin(req, res) {

        const user = await UserInfos.findOne({ email: req.body.email });
    
     
    
        if (!user) {
    
          return res
    
            .status(404)
    
            .json({ error: "email not found! kindly register first" });
    
        }
    
     
    
        if (bcrypt.compareSync(req.body.password, user.password)) {
    
          user.password = null;
    
          const token = TokenAuth.tokenGenerator({ user: user });
    
          return res
    
            .status(200)
    
            .json({ message: "succefully logged in", token: token,data:user });
    
        }
    
     
    
        return res.status(400).json({ error: "Password is wrong" });
    
      }
      static async bookTour(req, res) {

        const bookData = {
    
          user: req.user._id,
    
          tour: req.params.id,
    
        };
    
     
    
        const book = await BookInfos.create(bookData);
    
     
    
        const tour = await TourInfos.findById(req.params.id);
    
     
    
        if (!book) {
    
          return res.status(404).json({ error: "failed to book" });
    
        }
    sendSms(book.user.lastName, book.tour.names, book.status, book.id, book.user.phone);
     
    
        return res.status(200).json({ message: "Booked successfully", data: book });
    
      }
    
     
    
     
    
      
    
     
    
    //get all Bookes
    
     
    
      static async getAllBookings(req, res) {
    
        const books = await BookInfos.find();
    
     
    
        if (!books) {
    
          return res.status(404).json({ error: "Book Not found" });
    
        }
    
     
    
        return res.status(200).json({ message: "Success", data: books });
    
      }
    
      // get all booking by user
    
     
    
      static async getAllBookingsByUser(req, res) {
    
        // console.log(req.user)
    
        const books = await BookInfos.find({ user: req.user._id });
    
     
    
        if (!books) {
    
          return res.status(404).json({ error: "Book Not found" });
    
        }
    
     
    
        return res.status(200).json({ message: "Success", data: books });
    
      }
    
     
    
      // get all booking  by tour id
    
     
    
      static async getAllBookingsByTourId(req, res) {
    
        const books = await BookInfos.find({ tour: req.params.idtour });
    
     
    
        if (!books) {
    
          return res.status(404).json({ error: "book not found" });
    
        }
    
     
    
        return res.status(200).json({ message: "success", data: books });
    
      }
    
     
    
      //get all booking  by user id
    
     
    
      static async getaAllBookingByUserId(req, res) {
    
        console.log("hey what is happening");
    
        const bookings = await BookInfos.find();
    
        if (!bookings) {
    
          return res.status(404).json({ error: "not found" });
    
        }
    
     
    
        return res.status(200).json({ message: "success", data: bookings });
    
      }
    
    
      }


export default UserController;