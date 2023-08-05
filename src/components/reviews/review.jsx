import './review.css'

export default function Review(props){
    return(
        <div className="product-review-box">
            <div className="product-review-subbox">
                <h3>Krish Patel</h3>
                <h4><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></h4>
                <h4>Verified Buyer <i className="fa-solid fa-circle-check"></i></h4>
                <h5>23/02/2002</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae quasi, maiores non, quod consequatur provident odio deleniti dolores eligendi delectus labore natus nulla ipsum quo. Sed neque eos quibusdam error ex impedit odio itaque commodi sit laborum aut saepe nihil modi repellendus accusamus molestias veniam quidem illum, fuga perferendis explicabo?</p>
            </div>
        </div>
    )
}