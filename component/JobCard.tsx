import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface JobCardProps {
  job: {
    title: string;
    location: string;
    salary: number;
    phone: string;
  };
  onPress: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{job.title}</Text>
      <Text>📍 {job.location}</Text>
      <Text>💰 Salary: {job.salary}</Text>
      <Text>📞 {job.phone}</Text>
    </TouchableOpacity>
  );
};

export default JobCard;
