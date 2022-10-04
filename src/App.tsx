import {
  forwardRef,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import "./styles.css";
import { motion, AnimatePresence } from "framer-motion";

const Modal = forwardRef(
  (
    props: {
      children:
        | boolean
        | ReactChild
        | ReactFragment
        | ReactPortal
        | null
        | undefined;
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        open: () => setOpen(true),
        close: () => setOpen(false)
      };
    });

    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.3
                }
              }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 0.3
                }
              }}
              onClick={() => setOpen(false)}
              className="modal-backdrop"
            />
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.3
                }
              }}
              exit={{
                scale: 0,
                transition: {
                  delay: 0.3
                }
              }}
              className="modal-content-wrapper"
            >
              <motion.div
                initial={{
                  x: 100,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.3
                  }
                }}
                exit={{
                  x: 100,
                  opacity: 0,
                  transition: {
                    duration: 0.3
                  }
                }}
                className="modal-content"
              >
                {props.children}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

export default function App() {
  const [value, setValue] = useState("");
  const modalRef = useRef<any>();
  return (
    <div className="App">
      <p> Please hover at the bottom-right corner to see Notes edge.</p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="modal-button"
        onClick={() => modalRef.current.open()}
      >
        {value}
      </motion.div>
      <Modal ref={modalRef}>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Modal>
    </div>
  );
}
