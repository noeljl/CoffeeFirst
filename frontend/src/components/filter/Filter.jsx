import { useState } from "react";
import "./Filter.css";
import Button from "../buttons/Button";
import Icons from "../../assets/Icons";

function FilterButton() {
    const [isFilterOpen, setFilterOpen] = useState(false);
    return (<div>
        <Button bg="white" fs="small" radius="full" icon={Icons.filter} padding="medium" fw="bold">Filter</Button>
    </div>
    );
};

function FilterModal() {
    return (
        <div>
            {/* Insert filter model here */}
        </div>
    );
};

export default FilterButton;