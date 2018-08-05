var userModel = require('../model/userModel');
var bcrypt = require('bcryptjs');

var controller = {};


controller.add = (newItem, successMsg, req, res) => {
    newItem.save((err, savedData)=>{
        (err) ?
            controller.failResponse(req, res, err)
        :
            controller.successResponse(req, res, successMsg)
    });        
}



controller.successResponse = (req, res, successMsg) => {
    // return res.json({
    //         success: true,
    //         msg: message
    // });

    req.flash("success", successMsg);
    res.redirect('/login&signup');
}


  
controller.failResponse = (req, res, err) => {
    // return res.json({
    //         success: false,
    //         msg: message
    // });

    req.flash("error", err + 'Sorry! Please Try Again.');
    res.redirect('/login&signup');

}



controller.hashPassword = (password)=>{
    return bcrypt.hashSync(password, 5);
}



// controller.responseWithData = (res, message, data) => {
//     // return res.json({
//     //         success: true,
//     //         msg: message,
//     //         data: data
//     // });
// }





// controller.get = (model, res) => {
//     model.find({}, (err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })        
//     });
// }





// controller.getById = (model, id, res) => {
//     model.findById(id).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }





// controller.getActive = (model, res) => {
//     model.find({}).where({active: true}).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })        
//     });
// }





// controller.getWithPopulateAssoc = (model, populateItemName, res) => {
//     model.find({}).populate(populateItemName).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }





// controller.getByIdAndAssoc = (model, id, populateItemName, res) => {
//     model.findById(id).populate(populateItemName).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }




// controller.getSubItems = (model, id, select, populateItemName, res) => {
//     model.findById(id).select(select).where({active: true}).populate(populateItemName).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }




// controller.update = (model, id, updateData, item, res) => {

//     model.findByIdAndUpdate(id, updateData, (err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 msg: `SUCCESS : ${item} Updated Successfully.`
//             })
        
//     });
// }





// controller.updateWithNoResponce = (model, id, updateData, res) => {

//     model.findByIdAndUpdate(id, updateData, (err, data)=>{
//         if(err){
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         }else{

//         }               
//     });
// }






// controller.delete = (model, body, item, res) => {
//     model.findByIdAndRemove(body._id, (err, data)=>{
//         if (err) {
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         }else{
//             // console.log(data);
//             if(data.employeeName){
//                 controller.removeItemFromAssocItemsArray(employeeTypeModel, data.employeeType, data._id, 'Employee', res); 
//             }else if(data.brandName){
//                 controller.removeItemFromAssocItemsArray(categoryModel, data.category, data._id, 'Brand', res);
//             }else if(data.productName){
//                 // console.log('going to delete from array');
//                 controller.removeItemFromAssocItemsArray(brandModel, data.brand, data._id, 'Product', res);
//             }else if(data.partName){
//                 console.log('going to delete from array');
//                 controller.removeItemFromAssocItemsArray(productModel, data.product, data._id, 'Part', res);
//             }else{
//                 res.json({
//                     success: true,
//                     msg: `SUCCESS : ${item} Deleted Successfully.`
//                 })
//             }

//         }        
//     });
// }





// controller.removeItemFromAssocItemsArray = (model, id1, id2, item, res)=>{
//     model.findById(id1)
//                 .then(foundItem => {
//                     // console.log(empType);
//                     if(foundItem.employeeTypeName){
//                         var array =  foundItem.employees;
//                     }else if (foundItem.categoryName){
//                         var array =  foundItem.brands;
//                     }else if(foundItem.brandName){
//                         console.log('deleting from array');
//                         var array =  foundItem.products;
//                     }else if(foundItem.productName){
//                         console.log('deleting from array');
//                         var array =  foundItem.parts;
//                     }else{
//                         var array = null;
//                     }
//                     var index = array.indexOf(id2);
//                     // console.log(index);
//                     array.splice(index, 1);
//                     foundItem.save()
//                     .then(updatedItem => {
//                         res.json({
//                             success: true,
//                             msg: `SUCCESS : ${item} Deleted Successfully.`
//                         })
//                     })
//                 })
//                 .catch(err => {
//                     res.json({
//                         success: false,
//                         msg: "ERROR : Something Wrong. Please Try Again." 
//                     })
//                 })
// }





// controller.removeItemFromAssocItemsArrayWhenUpdate = (model, id1, id2, res)=>{
//     model.findById(id1)
//                 .then(foundItem => {
//                     // console.log(empType);
//                     if(foundItem.employeeTypeName){
//                         var array =  foundItem.employees;
//                     }else if(foundItem.categoryName){
//                         var array =  foundItem.brands;
//                     }else if(foundItem.brandName){
//                         var array =  foundItem.products;
//                     }else if(foundItem.productName){
//                         var array =  foundItem.parts;
//                     }else{
//                         var array = null;
//                     }
//                     var index = array.indexOf(id2);
//                     // console.log(index);
//                     array.splice(index, 1);
//                     foundItem.save();
//                 })
//                 .catch(err => {
//                     res.json({
//                         success: false,
//                         msg: "ERROR : Something Wrong. Please Try Again." 
//                     })
//                 })
// }





// controller.pushItemToAssocArray = (model, id, pushItem, item, res) => {
//     model.findById(id)
//     .then(foundItem => {
//         if(foundItem.employeeTypeName){
//             var array =  foundItem.employees;
//         }else if(foundItem.categoryName){
//             var array =  foundItem.brands;
//         }else if(foundItem.brandName){
//             var array =  foundItem.products;
//         }else if(foundItem.productName){
//             var array =  foundItem.parts;
//         }else{
//             var array = null;
//         }
//         array.push(pushItem);
//         foundItem.save()
//         .then(updatedItem => {
//             res.json({
//                 success: true,
//                 msg: `SUCCESS : ${item} Updated Successfully.`
//             })
//         })
//     })
//     .catch(err => {
//         res.json({
//             success: false,
//             msg: "ERROR : Something Wrong. Please Try Again." 
//         })
//     })
// }





// controller.getAllWithFilteredByServiceStatusExclude = (model, excludeItem, populateItemName, res) => {
//     model.find({}).where('serviceStatus').ne(excludeItem).populate(populateItemName).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }





// controller.countAllServiceReg = (model, res) => {
//     model.count({}).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }





// controller.countAllServiceRegByServiceStatus = (model, serviceStatus, res) => {
//     model.count({serviceStatus: serviceStatus}).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }




// controller.countAllServiceRegByWarranty = (model, warranty, res) => {
//     model.count({warranty: warranty}).exec((err, data)=>{
//         (err) ?
//             res.json({
//                 success: false,
//                 msg: "ERROR : Something Wrong. Please Try Again." 
//             })
//         :
//             res.json({
//                 success: true,
//                 data: data
//             })
        
//     });
// }




controller.ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        
        // res.json({
        //     success: false,
        //     msg: "You are not logged in.."
        // });

        req.flash("error", 'Sorry! You are not logged in.');
        res.redirect('/login&signup');
    }
}


// req.isAuthenticated






module.exports = controller;