import { BiShoppingBag } from "react-icons/bi";
import { Badge, Image, Button, Offcanvas } from "react-bootstrap";
import { useStore } from "../config/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { formatCurrency } from "../utils/formatCurrency";
import { toast } from "react-hot-toast";

export default function ShoppingBag() {
  const location = useLocation();
  const {
    cartQuantity,
    cartItems,
    show,
    setShow,
    increaseCartQty,
    decreaseCartQty,
    deleteCartItems,
    priceTotal,
    currentUser,
  } = useStore();

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        className="position-relative mx-4"
        onClick={location.pathname === "/bag" ? null : handleShow}
      >
        <BiShoppingBag style={{ cursor: "pointer" }} size="24px" />
        <h6 className="position-absolute top-0 start-100 translate-middle fs-6">
          <Badge pill bg="dark">
            {cartQuantity > 0 ? cartQuantity : 0}
          </Badge>
        </h6>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1 className="fs-3 fw-bold">BAG</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <>
            {cartItems?.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div key={item._id}>
                    <div className="d-flex align-items-center gap-4 mb-4 w-100">
                      <Link
                        to={`/collections/${item.category}/${item.slug}`}
                        onClick={handleClose}
                      >
                        <Image
                          src={item?.images[0]}
                          alt={item.title}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </Link>
                      <div className="d-flex flex-column flex-grow-1 justify-content-between">
                        <p className="fs-6 fw-bold mb-0">{item.title}</p>
                        <span className="fs-6">{item.category}</span>
                        <div className="d-flex align-items-center justify-content-between qtyBox">
                          <div className="d-flex gap-2 align-items-center border border-black p-2 rounded-1">
                            <AiOutlineMinusCircle
                              style={{ cursor: "pointer" }}
                              size="16px"
                              onClick={() => decreaseCartQty(item)}
                            />
                            <span className="fs-5 fw-medium">
                              {item.quantity}
                            </span>
                            <AiOutlinePlusCircle
                              style={{ cursor: "pointer" }}
                              size="16px"
                              onClick={() => increaseCartQty(item)}
                            />
                          </div>
                          <span className="fs-5">
                            {formatCurrency(item.price)}
                          </span>
                          <AiOutlineDelete
                            style={{ cursor: "pointer" }}
                            size="16px"
                            className="hideTrash"
                            onClick={() => deleteCartItems(item)}
                          />
                        </div>
                      </div>
                    </div>{" "}
                    <hr />
                  </div>
                ))}
                <div className="w-100 mt-4">
                  <h1>
                    <span className="fs-4">Subtotal: </span>
                    <span className="fw-bold">
                      {formatCurrency(priceTotal)}{" "}
                    </span>
                  </h1>
                  <span className="fs-6 mb-4">
                    Taxes and shipping are calculated at checkout
                  </span>
                  <div>
                    <Button
                      variant="outline-dark"
                      className="rounded-0 w-100 mb-3 fw-bold"
                      onClick={() => {
                        handleClose();
                        {
                          currentUser
                            ? navigate("/checkout")
                            : toast.error(
                                "please sign in to proceed to checkout"
                              );
                        }
                      }}
                    >
                      Checkout
                    </Button>
                    <Button
                      variant="outline-dark"
                      className="rounded-0 w-100 mb-3 fw-bold"
                      as={Link}
                      to={"/bag"}
                      onClick={handleClose}
                    >
                      View bag
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <h1 className="text-center mt-5 fs-4">Your bag is empty</h1>
            )}
          </>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
