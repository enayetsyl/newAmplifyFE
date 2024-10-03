import Button from "@/components/shared/button";

const PollDetailsModal = ({ poll, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-custom-dark-blue-1">{poll.pollName}</h2>
      
        <p className="text-custom-dark-blue-1"><strong>Total Questions:</strong> {poll.questions.length}</p>
        <div>
          {poll.questions.map((question, index) => (
            <div key={question._id} className="mt-4">
              <p><strong>Question {index + 1}:</strong> {question.question}</p>
              <p className="py-1"><strong>Type:</strong> {question.type}</p>
              <p><strong>Answers:</strong></p>
              <ul className="list-disc list-inside">
                {question.answers.map((answer) => (
                  <li key={answer._id}>{answer.answer}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button 
          children={"Close"}
          type="button"
          className=" font-semibold px-4 py-2 rounded-lg "
          variant="secondary"
          onClick={onClose}
          />
          
        </div>
      </div>
    </div>
  );
};

export default PollDetailsModal;
