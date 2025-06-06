import Link from "next/link"

const CartSidebar = () => {
  return (
    <div>
      {/* Cart items will be displayed here */}
      <p>Your Cart is Empty</p>
      <Link href="/checkout" className="w-full">
        <Button className="w-full bg-[#5D1A1D] hover:bg-[#6B1E22] text-white">PROCEDER AL PAGO</Button>
      </Link>
    </div>
  )
}

export default CartSidebar

import { Button } from "@/components/ui/button"
