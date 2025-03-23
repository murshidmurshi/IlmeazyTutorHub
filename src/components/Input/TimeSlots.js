import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

const session = {
  title: "Session",
  categories: ["Morning", "Afternoon", "Evening"]
}

export default function TimeSlots() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <FlatList
        data={session.categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{item}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    marginRight: 10,
  },
  category: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
})

