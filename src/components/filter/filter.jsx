import './filter.css'

export default function Search(){
    return(
        <>
            <div className="filter-wrapper">
                <div className="filter-main">
                    <h3>FILTER BY</h3>
                    <button>Clear All</button>
                </div>
                <div className="filter-dash"></div>
                <div className="filter-section">
                    <div className="filter-main">
                        <h3>BRAND</h3>
                        <button>Clear</button>
                    </div>
                    <div className="brand-section">
                        <input type="checkbox" name="" id="" />
                        <span>Nike</span>
                    </div>
                    <div className="brand-section">
                        <input type="checkbox" name="" id="" />
                        <span>Nike</span>
                    </div>
                    <div className="brand-section">
                        <input type="checkbox" name="" id="" />
                        <span>Nike</span>
                    </div>
                </div>
                <div className="filter-dash"></div>
                <div className="filter-section">
                    <div className="filter-main">
                        <h3>PRICE</h3>
                        <button>Clear</button>
                    </div>
                    <div className="price-section">
                        <div className="price-section-box">
                            <input type="number" name="" id="" placeholder='Min'/>
                            <h4>-</h4>
                            <input type="number" name="" id="" placeholder='Max'/>
                        </div>
                        <div className="price-section-range">
                            <input type="range" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}