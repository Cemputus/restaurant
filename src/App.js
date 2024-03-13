// import React, { Component } from "react";
// import { Route, HashRouter as Router, Switch } from "react-router-dom";
// import ReactFontFace from "react-font-face";
// import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
// import "./App.css";

// import { fontPrimary } from "./assets/font/font";

// import Layout from "./hoc/Layout";
// import AdminPanel from "./components/AdminPanel/AdminPanel";
// import MealDetails from "./components/MealManagement/Meals/MealDetails";
// import Menu from "./components/UserPanel/UserPanel";
// import LandingPage from "./components/UI/LandingPage/LandingPage";
// import Checkout from "./components/UserPanel/Checkout/Checkout";
// import OrderStats from "./components/AdminPanel/OrderStats/OrderStats";
// import Login from "./components/Auth/Login/Login";

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div className="App">
//           <Switch>
//             <Route exact path="/" component={LandingPage} />
//             <Route path="/login" component={UserIsNotAuthenticated(Login)} />
//             <Route exact path="/menu" component={Menu} />
//             <Route path="/menu/checkout" component={Checkout} />
//             <Layout>
//               <Route
//                 exact
//                 path="/adminpanel"
//                 component={UserIsAuthenticated(AdminPanel)}
//               />
//               <Route
//                 exact
//                 path="/adminpanel/orders"
//                 component={UserIsAuthenticated(OrderStats)}
//               />
//               <Route
//                 path="/meals/:id"
//                 component={UserIsAuthenticated(MealDetails)}
//               />
//             </Layout>
//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }

// export default ReactFontFace(App, fontPrimary);



import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ReactFontFace from "react-font-face";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import "./App.css";

import { fontPrimary } from "./assets/font/font";

import Layout from "./hoc/Layout";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import MealDetails from "./components/MealManagement/Meals/MealDetails";
import Menu from "./components/UserPanel/UserPanel";
import LandingPage from "./components/UI/LandingPage/LandingPage";
import Checkout from "./components/UserPanel/Checkout/Checkout";
import OrderStats from "./components/AdminPanel/OrderStats/OrderStats";
import Login from "./components/Auth/Login/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<UserIsNotAuthenticated component={Login} />}
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/checkout" element={<Checkout />} />
            <Route
              path="/adminpanel"
              element={<UserIsAuthenticated component={<AdminPanel />} />}
            />
            <Route
              path="/adminpanel/orders"
              element={<UserIsAuthenticated component={<OrderStats />} />}
            />
            <Route
              path="/meals/:id"
              element={<UserIsAuthenticated component={<MealDetails />} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default ReactFontFace(App, fontPrimary);
