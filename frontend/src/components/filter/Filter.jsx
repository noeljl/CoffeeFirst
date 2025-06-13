import { useState } from "react";
import "./Filter.css";
import filterIcon from '../../assets/setting-4.svg';
import Button from "../buttons/Button";

function FilterButton() {
    const [isFilterOpen, setFilterOpen] = useState(false);
    return (<div>
        <Button bg="white" fs="small" radius="full" icon={filterIcon} padding="medium" fw="bold">Filter</Button>
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