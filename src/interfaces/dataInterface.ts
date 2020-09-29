export default interface DataInterface {
  id: number;
  title: string;
  creatable: boolean;
  cards: Array<{
    id: number;
    content: string;
    labels: Array<string>;
    user: string;
  }>;
  done?: boolean;
}
