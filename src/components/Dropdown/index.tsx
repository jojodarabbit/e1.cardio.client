import { FC, useState } from 'react';
import styles from './dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface DropdownProps {
    userName?: string;
    userRole?: string;
}


const Dropdown: FC<DropdownProps> = (props) => {
  const { userName, userRole } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Thông tin', 'Đăng xuất'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const handleOptionSelect = (option : any) => {
    setSelectedOption(option);
    setIsOpen(false);
    if(selectedOption == "Đăng xuất") {
        navigate("/logout");
    }
    else if(selectedOption == "Thông tin"){
        navigate("/currentUserInfo");
    }
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownheader} onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faAngleDown} />
        <div className={styles.content}>
            <h3>{userName}</h3>
            <span>{userRole}</span>
        </div>
        {/* <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span> */}
      </div>
      {isOpen && (
        <ul className={styles.dropdownlist}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;