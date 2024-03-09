import { useState } from "react";
import "./MentorDetail.css";
import jsPDF from "jspdf";

const MentorDetail = ({
  mentor,
  assignedStudents,
  unassignedStudents,
  onGoBack,
  onAddStudent,
  onRemoveStudent,
  onUpdateMarks,
}) => {
  const [isLocked, setIsLocked] = useState(false);

  const handleRemoveStudent = (studentId) => {
    if (!isLocked) {
      onRemoveStudent(studentId);
    }
  };

  const handleMarkChange = (studentId, markType, value) => {
    if (!isLocked) {
      onUpdateMarks(studentId, markType, value);
    }
  };

  const handleLockData = () => {
    setIsLocked(true);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Mentor: ${mentor.name} - Assigned Students`, 10, 10);
    let y = 20;
    assignedStudents.forEach((student) => {
      doc.text(
        `${student.name} - Ideation: ${student.ideation}, Execution: ${student.execution}, Viva: ${student.viva}, Total: ${student.total}`,
        10,
        y
      );
      y += 10;
    });
    doc.save("mentor_detail.pdf");
  };

  return (
    <div className="mentor-detail">
      <h2>{mentor.name} - Assigned Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ideation</th>
            <th>Execution</th>
            <th>Viva</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <input
                  type="number"
                  value={student.ideation}
                  onChange={(e) =>
                    handleMarkChange(student.id, "ideation", e.target.value)
                  }
                  disabled={isLocked}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.execution}
                  onChange={(e) =>
                    handleMarkChange(student.id, "execution", e.target.value)
                  }
                  disabled={isLocked}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.viva}
                  onChange={(e) =>
                    handleMarkChange(student.id, "viva", e.target.value)
                  }
                  disabled={isLocked}
                />
              </td>
              <td>{student.total}</td>
              <td>
                <button
                  onClick={() => handleRemoveStudent(student.id)}
                  disabled={isLocked}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isLocked && (
        <>
          <h2>Unassigned Students</h2>
          <table>
            <tbody>
              {unassignedStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>
                    <button onClick={() => onAddStudent(student.name)}>
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleLockData}>Submit</button>
        </>
      )}
      {isLocked && <button onClick={downloadPDF}>Download PDF</button>}
      <button onClick={onGoBack}>Go Back</button>
    </div>
  );
};

export default MentorDetail;
