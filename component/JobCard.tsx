import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { DisplayJob } from "@/screens/DisplayJob";

interface JobCardProps {
  job: DisplayJob;
  onPress: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  const handleWhatsAppPress = () => {
    if (job.whatsappLink) {
      Linking.openURL(job.whatsappLink);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.place}>📍 {job.place}</Text>
      <Text style={styles.salary}>💰 Salary: {job.salary}</Text>
      <Text style={styles.company}>🏢 {job.companyName}</Text>
      <View style={styles.tagsContainer}>
        {job.jobTags?.map((tag) => (
          <View
            key={tag.value}
            style={[styles.tag, { backgroundColor: tag.bg_color }]}
          >
            <Text style={[styles.tagText, { color: tag.text_color }]}>
              {tag.value}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.jobType}>💼 {job.jobType}</Text>
      <Text style={styles.experience}>⏳ Experience: {job.experience}</Text>
      <Text style={styles.qualification}>
        🎓 Qualification: {job.qualification}
      </Text>
      <Text style={styles.role}>🎯 Role: {job.jobRole}</Text>
      <Text style={styles.category}>📂 Category: {job.jobCategory}</Text>
      <Text style={styles.fees}>💸 Fees: {job.feesText}</Text>
      {job.whatsappLink && (
        <TouchableOpacity onPress={handleWhatsAppPress}>
          <Text style={styles.whatsapp}>🔗 WhatsApp Link</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  place: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  salary: {
    fontSize: 16,
    color: "#42b883",
    marginBottom: 3,
  },
  company: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: "#fff",
  },
  jobType: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  experience: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  qualification: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  role: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  category: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  fees: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  whatsapp: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 5,
  },
});

export default JobCard;
