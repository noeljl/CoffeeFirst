import { useState } from "react";
import "./CheckIn.css";
import Button from "../buttons/Button";
import Icons from "../../../assets/Icons";


function CheckInButton() {
    const [isCheckInOpen, setCheckInOpen] = useState(false);
    return (<div>
        <Button bg="red" fs="small" radius="full" icon={Icons.scanBarcode} padding="medium" fw="bold">Check-in</Button>
    </div>
    );
};

function CheckInModal() {
    return (
        <div>
            {/* Insert check-in model here */}
        </div>
    );
};

export default CheckInButton;