import Item from "../models/item.js";

export function getAllItem(req,res){
    Item.find().then(
        (items)=>{
            res.json(items)
        }
    )
}
export function saveItem(req,res){
    if(req.user.role != "admin"){
        res.status(403).json({
            message:"You cannot add Items"
        })
        return ;
    }

}