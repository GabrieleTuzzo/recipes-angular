export interface Recipe {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: {
    ingredient: string;
    measure: string;
  }[];
}
