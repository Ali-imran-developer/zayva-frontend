import ShoppingHeader from "@/components/shopping-view/header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  function handleClick(){
    navigate(`/shop/home`);
  }
  return <div>
    <ShoppingHeader/>
    <div className="flex items-center justify-center pt-10 mt-10">
      <div className="text-7xl font-bold pt-10 mt-10">404 not found!</div>
    </div>
    <div className="flex items-center justify-center mt-10 mr-10">
      <Button onClick={() => handleClick()}>Go Back to Home</Button>
    </div>
  </div>;
}

export default NotFound;
