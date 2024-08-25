import { useState, useEffect, useContext } from "react";
import { currencyFormator } from "../../lib/utils";

// icons
import { FaRegTrashAlt } from "react-icons/fa";

//Modal
import Modal from "../Modal";

// context
import { financeContext } from "../context/FinanceContext";

// uuid
import { v4 as uuidv4 } from "uuid";

// toast
import { toast } from "react-toastify";

const ViewExpenseModal = ({ show, onClose, expense }) => {
  const ktx = useContext(financeContext);

  const { expenses, deleteExpenseCategory, deleteCategory } = ktx;

  const deleteExpenseCategoryHandler = async (item) => {
    const updateItems = expense.items.filter((i) => i.id !== item.id);
    const updateExpenses = {
      items: [...updateItems],
      total: expense.total - item.amount,
    };
    await deleteExpenseCategory(updateExpenses, expense.uid);
    
  };

  const deleteWholeCategory = () => {
    try {
      deleteCategory(expense.uid);
      onClose(false)
      toast.success("whole category deleted");
    } catch (error) {
      toast.success("something went wrong");

      console.log(error);
      throw error;
    }
  };

  return (
    <Modal show={show} setShow={onClose}>
      <div className="flex items-center justify-between">
        <h3 className="text-4xl">{expense.title}</h3>
        <button className="btn btn-danger" onClick={deleteWholeCategory}>
          delete
        </button>
      </div>

      <div className="my-4 text-2xl">
        <h2>Expenses History</h2>
        {expense?.items?.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <small>
                {item.createdAt.toMillis
                  ? new Date(item.createdAt.toMillis()).toISOString()
                  : item.createdAt.toISOString()}
              </small>
              <p className="flex items-center gap-2">
                {currencyFormator(item.amount)}
                <button
                  onClick={() => {
                    deleteExpenseCategoryHandler(item);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;
