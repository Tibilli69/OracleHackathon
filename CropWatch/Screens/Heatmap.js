import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

export function Heatmaps() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://run.mocky.io/v3/f9daf185-ea48-44b6-88f6-e54a81fd95c6');
        setData(response.data);
        const heatmapPoints = response.data.map(item => ({
          latitude: item.latitude,
          longitude: item.longitude,
          weight: item.weight,
        }));
        setHeatmapData(heatmapPoints);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: data[0]?.latitude || 37.78825,
          longitude: data[0]?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Heatmap
          points={heatmapData}
          radius={50}
          opacity={0.7}
          gradient={{
            colors: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
            startPoints: [0.01, 0.04, 0.1, 0.45, 0.5],
            colorMapSize: 256,
          }}
        />
      </MapView>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Detected Insects</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Location: ({item.latitude}, {item.longitude})</Text>
              <Text style={styles.listItemText}>Detected: {item.timestamp}</Text>
              <Text style={styles.listItemText}>Weight: {item.weight}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Heatmap Legend</Text>
        <View style={styles.legend}>
          <View style={[styles.legendColor, { backgroundColor: '#00f' }]} />
          <Text style={styles.legendText}>Low</Text>
          <View style={[styles.legendColor, { backgroundColor: '#0ff' }]} />
          <Text style={styles.legendText}>Medium-Low</Text>
          <View style={[styles.legendColor, { backgroundColor: '#0f0' }]} />
          <Text style={styles.legendText}>Medium</Text>
          <View style={[styles.legendColor, { backgroundColor: '#ff0' }]} />
          <Text style={styles.legendText}>Medium-High</Text>
          <View style={[styles.legendColor, { backgroundColor: '#f00' }]} />
          <Text style={styles.legendText}>High</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  legendContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap:'wrap',
  },
  legendColor: {
    width: 10,
    height: 10,
  },
  legendText: {
    fontSize: 16,
    marginRight: 5,
    flexWrap:'start',
  },
});
