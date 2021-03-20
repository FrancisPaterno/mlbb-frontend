import baseApi from './baseapi';

class HeroApi {
    getAllHeroes(){
        return baseApi.get('all');
    }

    getHeroesByFilter(filter){
        return baseApi.get(`?category=${filter.category}&searchVal=${filter.searchVal}`);
    }

    createHero(hero){
        return baseApi.post('',hero);
    }

    getHerobyId(id){
        return baseApi.get(id);
    }

    updateHero(hero, heroId){
        return baseApi.put(heroId, hero);
    }

    removeHero(id){
        return baseApi.delete(`${id}`);
    }
}

export default new HeroApi()