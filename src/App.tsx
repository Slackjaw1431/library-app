import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavboorAndFooter/Navbar";
import { Footer } from "./layouts/NavboorAndFooter/Footer";
import { Homepage } from "./layouts/Homepage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { Route, Switch, Redirect } from "react-router-dom";
import { BooksCheckoutPage } from "./layouts/BooksCheckoutPage/BooksCheckoutPage";

export const App = () => {
  return (
    <div className={"d-flex flex-column min-vh-100"}>
      <Navbar />
      <div className={"flex-grow-1"}>
        <Switch>
          <Route path={"/"} exact>
            <Redirect to={"/home"} />
          </Route>
          <Route path={"/home"} exact>
            <Homepage />
          </Route>
          <Route path={"/search"}>
            <SearchBooksPage />
          </Route>
          <Route path={"/checkout/:bookId"}>
            <BooksCheckoutPage />
          </Route>
          {/*<Route path=''>*/}
          {/*</Route>*/}
        </Switch>
      </div>
      <Footer />
    </div>
  );
};