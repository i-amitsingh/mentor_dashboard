import "./MentorList.css";

const MentorList = ({ mentors, onMentorClick }) => {
  return (
    <div className="mentor-list">
      <h2>Mentor List</h2>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id} onClick={() => onMentorClick(mentor.id)}>
            {mentor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
