import {Animation} from "../animations/AnimationsEngine";
import {getDijkstraAnimations} from "./dijkstra";

//type getAnimationType = () => ( (grid: number[][], startNode: number[], endNode: number[]) => Animation[])

export class Algorithm {
    static Dijkstra = new Algorithm(getDijkstraAnimations)

    public getAnimations: any

    constructor(getAnimation: any) {
        this.getAnimations = getAnimation
    }

}