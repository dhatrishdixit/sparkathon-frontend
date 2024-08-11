
import { useParams, useLocation, Link } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ProductSchema {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const fetchProductDetails = (id: string): ProductSchema => {
  // This would typically be an API call
  return {
    id: parseInt(id),
    title: `Product ${id}`,
    description: "This is a sample product description.",
    price: 29.99 + parseInt(id), // Just for variety
    imageUrl: `/api/placeholder/600/600`,
  };
};

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const passedProduct = location.state?.product as ProductSchema | undefined;
  console.log(passedProduct)
  
  // Use passed product data if available, otherwise fetch it
  const product = passedProduct || fetchProductDetails(id!);

  // This would typically come from an API or be passed as props


  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 h-screen overflow-y-hidden" >
      <div className="grid gap-4 md:gap-10 items-start">
        <img
          src={product.imageUrl}
          alt={product.title}
          width={600}
          height={600}
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.title}</h1>
          <div className="text-sm leading-loose text-muted-foreground">{product.description}</div>
          <div className="text-4xl font-bold">${product.price.toFixed(2)}</div>
        </div>
        <form className="grid gap-4 md:gap-8">
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button size="lg">Add to cart</Button>
        </form>
      </div>
    </div>
  );
};

