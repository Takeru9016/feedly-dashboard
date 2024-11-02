import { StarIcon } from "lucide-react";

type RatingProps = {
  rating: number;
  count: number;
};

export default function Rating({ rating, count }: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-5 w-5 ${
            rating > index
              ? "fill-primary"
              : "fill-muted stroke-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}
