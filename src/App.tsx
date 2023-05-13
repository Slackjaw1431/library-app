import React from "react";
import "./App.css";
import {Navbar} from "./layouts/NavboorAndFooter/Navbar";
import {Footer} from "./layouts/NavboorAndFooter/Footer";
import {Homepage} from "./layouts/Homepage/HomePage";
import {SearchBooksPage} from "./layouts/SearchBooksPage/SearchBooksPage";
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
import {BooksCheckoutPage} from "./layouts/BooksCheckoutPage/BooksCheckoutPage";
import {oktaConfig} from "./lib/oktaConfig";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";
import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import {ReviewListPage} from "./layouts/BooksCheckoutPage/ReviewListPage/ReviewListPage";
import {ShelfPage} from "./layouts/ShelfPage/ShelfPage";
import {MessagesPage} from "./layouts/MessagesPage/MessagesPage";
import {ManageLibraryPage} from "./layouts/ManageLibraryPage/ManageLibraryPage";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

    const customAuthHandler = () => {
        history.push('/login');
    }

    const history = useHistory();
    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
      history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
    }
        return (
            <div className={"d-flex flex-column min-vh-100"}>
                <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}
                          onAuthRequired={customAuthHandler}>
                    <Navbar/>
                    <div className={"flex-grow-1"}>
                        <Switch>
                            <Route path={"/"} exact>
                                <Redirect to={"/home"}/>
                            </Route>
                            <Route path={"/home"} exact>
                                <Homepage/>
                            </Route>
                            <Route path={"/search"}>
                                <SearchBooksPage/>
                            </Route>
                            <Route path={"/checkout/:bookId"}>
                                <BooksCheckoutPage/>
                            </Route>
                            <Route path={"/reviewList/:bookId"}>
                                <ReviewListPage/>
                            </Route>
                            <SecureRoute path={"/shelf"}>
                                <ShelfPage/>
                            </SecureRoute>
                            <SecureRoute path={"/messages"}>
                                <MessagesPage/>
                            </SecureRoute>
                            <SecureRoute path={"/admin"}>
                                <ManageLibraryPage/>
                            </SecureRoute>
                            <Route path={'/login'} render={() =>
                                <LoginWidget config={oktaConfig}/>
                            }
                            />
                            <Route path={'/login/callback'} component={LoginCallback}/>
                        </Switch>
                    </div>
                    <Footer/>
                </Security>
            </div>
        );
    };