import "./Avatar.css";

function Avatar() {
    return (<div>
        <img className="avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" draggable={false}/>
    </div>
    );
};

export default Avatar;