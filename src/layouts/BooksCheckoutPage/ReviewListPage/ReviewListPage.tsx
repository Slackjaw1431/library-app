import ReviewModel from "../../../models/ReviewModel";
import {useEffect, useState} from "react";
import SpinnerLoading from "../../utils/SpinnerLoading";
import {Review} from "../../utils/Review";
import {Pagination} from "../../utils/Pagination";

export const ReviewListPage = () => {
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_URL}/reviews/search/findByBookId?bookId=${bookId}&page=${currentPage - 1}&size=${reviewsPerPage}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error(('Review error'));
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;
            const loadedReviews: ReviewModel[] = [];
            setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages)

            for (const loadedReviewsKey in responseData) {
                loadedReviews.push({
                    id: responseData[loadedReviewsKey].id,
                    userEmail: responseData[loadedReviewsKey].userEmail,
                    date: responseData[loadedReviewsKey].date,
                    rating: responseData[loadedReviewsKey].rating,
                    book_id: responseData[loadedReviewsKey].bookId,
                    reviewDescription: responseData[loadedReviewsKey].reviewDescription,
                });
            }
            setReviews(loadedReviews);
            setIsLoading(false);
        }
        fetchBookReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage])

    if (isLoading) {
        return <SpinnerLoading/>
    }

    if (httpError) {
        return (
            <div className={'container m-5'}>
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className={'container m-5'}>
            <div>
            <h3>Number of Reviews: {reviews.length}</h3>
        </div>

        <p>
            {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} reviews:
        </p>
            <hr/>
            <div className={'row'}>
                {reviews.map(review => (
                    <Review review= {review} key = {review.id}/>
                ))}

            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
        );
}