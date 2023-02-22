import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./common.css";
import "./App.scss"
import "./Library/slick-carousel/Slick-Convert.scss"
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";

import Film from "./Components/Film/Film"
import BookTicket from "./Components/Book-Ticket/Book-Ticket";
import PayCard from "./Components/PayTicket/PayCard/PayCard";
import BookFail from "./Components/Book-Ticket/Book-Fail/Book-Fail";
import PageBuyTicket from "./Components/PageBuyTicket/PageBuyTicket";


import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import Rap from "./Components/Rap/Rap"
import Bank from "./Components/Bank/Bank"
import ChangePass from "./Components/ChangePass/ChangePass";
import ManageUser from "./Components/ManageUser/ManageUser";
import TopButton from "./Components/Logic/TopButton/TopButton";
import PaySuccess from "./Components/PayTicket/PayCard/PaySuccess/PaySuccess";
import FindTicket from "./Components/PayTicket/FindTicket/FindTicket";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path='/Film/:id' element={<Film/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/Book-Ticket" element={<PrivateRoute><BookTicket/></PrivateRoute>}/>
                    <Route path="/Pay/:email" element={<PrivateRoute><PayCard/></PrivateRoute>}/>
                    <Route path="/Muave" element={<PageBuyTicket/>}/>
                    <Route path='/rap' element={<PrivateRoute><Rap/></PrivateRoute>}/>
                    <Route path='/manageUser'
                           element={<PrivateRouteAdmin Role={1}> <ManageUser/> </PrivateRouteAdmin>}/>
                    <Route path="changePass" element={<ChangePass/>}/>
                    <Route path='bank' element={<PrivateRoute><Bank/></PrivateRoute>}/>
                    <Route path='Loive' element={<PrivateRoute><BookFail/></PrivateRoute>}/>
                    <Route path='PaySuccess' element={<PrivateRoute><PaySuccess/></PrivateRoute>}/>
                    <Route path='FindTicket' element={<PrivateRoute><FindTicket/></PrivateRoute>}/>
                </Routes>
                <TopButton/>
                <Footer/>
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;