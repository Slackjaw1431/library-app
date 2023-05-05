import {useOktaAuth} from "@okta/okta-react";
import {useEffect, useState} from "react";
import ShelfCurrentLoans from "../../models/ShelfCurrentLoans";
import SpinnerLoading from "../utils/SpinnerLoading";

export const Loans = () => {
    const {authState} = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/books/secure/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    header: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentLoansResponse = await fetch (url, requestOptions);
                if(!shelfCurrentLoansResponse.ok){
                    throw new Error("Current Loans error");
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error:any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        window.scrollTo(0,0);
    }, [authState])

    if(isLoadingUserLoans){
        <SpinnerLoading/>
    }
    if(httpError){
        return(
            <div className={'container m-5'}>
                <p>{httpError}</p>
            </div>
        )
    }

    return(<div></div>);
}