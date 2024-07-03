import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Panel</h1>
      <p className="mb-6">Please log in to access the admin panel.</p>
      <Input className="mb-4" type="email" placeholder="Enter your email address" required />
      <Input className="mb-4" type="password" placeholder="Enter your password" required />
      <Button className="mb-4" text="Sign In" />
    </div>
  );
}
