import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setFilter } from "../redux/reducers/TodoReducer";

export default function FilterBtn(){
    const dispatch = useDispatch();
    const [activeBtn, setActiveBtn] = useState("all");
    const filter = useSelector((state) => state.todos.filter)
    console.log('filter = ' + filter)

    const handleFilter = (filter) => {
        setActiveBtn(filter);
        dispatch(setFilter(filter));
    };

    return (
        <div className="row filter-btn m-5">
            <div className="col-12">
                <button
                    className={`btn ${activeBtn === "all" ? "btn-success" : "btn-secondary"}`}
                    onClick={() => handleFilter("all")}
                >
                    All
                </button>

                <button
                    className={`btn ${activeBtn === "active" ? "btn-success" : "btn-secondary"}`}
                    onClick={() => handleFilter("active")}
                >
                    Active
                </button>

                <button
                    className={`btn ${activeBtn === "completed" ? "btn-success" : "btn-secondary"}`}
                    onClick={() => handleFilter("completed")}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}
