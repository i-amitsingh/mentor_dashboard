import "./App.css";
import { useState } from "react";
import MentorList from "./components/MentorList";
import MentorDetail from "./components/MentorDetail";
import { mentors as initialMentors, students as initialStudents } from "./data";

function App() {
  const [mentors, setMentors] = useState(initialMentors);
  const [students, setStudents] = useState(initialStudents);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleMentorClick = (mentorId) => {
    setSelectedMentor(mentorId);
  };

  const handleGoBack = () => {
    setSelectedMentor(null);
  };

  const getAssignedStudents = () => {
    return students.filter((student) => student.mentorId === selectedMentor);
  };

  const handleUpdateMarks = (studentId, marks) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          ideation: marks.ideation,
          execution: marks.execution,
          viva: marks.viva,
          total: marks.ideation + marks.execution + marks.viva,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleAddStudent = (studentName) => {
    if (getAssignedStudents().length < 4) {
      const existingStudent = students.find(
        (student) => student.name === studentName
      );
      if (existingStudent) {
        if (!existingStudent.mentorId) {
          const updatedStudents = students.map((student) =>
            student.name === studentName
              ? { ...student, mentorId: selectedMentor }
              : student
          );
          setStudents(updatedStudents);
        } else {
          alert("This student is already assigned to a mentor.");
        }
      } else {
        const newStudent = {
          id: students.length + 1,
          name: studentName,
          mentorId: selectedMentor,
          ideation: 0,
          execution: 0,
          viva: 0,
          total: 0,
        };
        setStudents([...students, newStudent]);
      }
    } else {
      alert("A mentor can have a maximum of 4 students.");
    }
  };

  const handleRemoveStudent = (studentId) => {
    if (getAssignedStudents().length > 3) {
      const updatedStudents = students.map((student) =>
        student.id === studentId ? { ...student, mentorId: null } : student
      );
      setStudents(updatedStudents);
    } else {
      alert("A mentor must have a minimum of 3 students.");
    }
  };

  return (
    <div className="app">
      {selectedMentor ? (
        <MentorDetail
          mentor={mentors.find((mentor) => mentor.id === selectedMentor)}
          assignedStudents={getAssignedStudents()}
          unassignedStudents={students.filter((student) => !student.mentorId)}
          onGoBack={handleGoBack}
          onUpdateMarks={handleUpdateMarks}
          onAddStudent={handleAddStudent}
          onRemoveStudent={handleRemoveStudent}
        />
      ) : (
        <MentorList mentors={mentors} onMentorClick={handleMentorClick} />
      )}
    </div>
  );
}

export default App;
