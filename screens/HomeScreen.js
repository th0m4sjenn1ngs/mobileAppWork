import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import  React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'; 
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTrendingMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == 'ios'

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

 

  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, []);

const getTrendingMovies = async () => {
  const data = await fetchTrendingMovies();
  if(data && data.results) setTrending(data.results);
  setLoading(false)
}

const getUpcomingMovies = async () => {
  const data = await fetchUpcomingMovies();
  //console.log('got upcoming movies: ', data);
  if(data && data.results) setUpcoming(data.results);
}

const getTopRatedMovies = async () => {
  const data = await fetchTopRatedMovies();
  //console.log('got top rated movies: ', data);
  if(data && data.results) setTopRated(data.results);
}

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios?"-mb-2": "mb-3"}>
        <StatusBar style="light"/>
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      {
        loading ? (
          <Loading/>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
          >

            {  <TrendingMovies data={trending}/> }   

            {/* <MovieList title="Trending" data={trending}/>    */}

            <MovieList title="Upcoming" data={upcoming}/>

            <MovieList title="Top Rated" data={topRated} />

          </ScrollView>
        )
      }

    </View>
  )
}
