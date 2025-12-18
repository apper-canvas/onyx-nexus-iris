import { cn } from "@/utils/cn";

const Avatar = ({ name, src, size = "md", className }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base"
  };

  const getInitials = (name) => {
    const parts = name?.split(" ") || [];
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name?.[0]?.toUpperCase() || "?";
  };

  const getGradient = (name) => {
    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600"
    ];
    const index = (name?.charCodeAt(0) || 0) % gradients.length;
    return gradients[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br",
      getGradient(name),
      sizes[size],
      className
    )}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;