
export default class Polygon {
    __edge_of_polygons__(polygons){
        let [min_x,min_y,max_x,max_y] = [0,0,0,0]
        for(let p of polygons){
            min_x = p[0] < min_x ? p[0] : min_x
            min_y = p[1] < min_y ? p[1] : min_y
            max_x = p[0] > max_x ? p[0] : max_x
            max_y = p[1] > max_y ? p[1] : max_y
        }
        return [[min_x,max_x],[min_y,max_y]]
    }
    __on_segment__(point_start, point_target, point_end) {
        if ((point_target[0] <= Math.max(point_start[0], point_end[0])) &&
            (point_target[0] >= Math.min(point_start[0], point_end[0])) &&
            (point_target[1] <= Math.max(point_start[1], point_end[1])) &&
            (point_target[1] >= Math.min(point_start[1], point_end[1])))
            return true
        return false
    }

    __orientation__(point_start, point_target, point_end) {
        const val = (point_target[1] - point_start[1]) * (point_end[0] - point_target[0]) -
            (point_target[0] - point_start[0]) * (point_end[1] - point_target[1])
        if (val === 0)
            return val
        else if (val > 0)
            return 1
        else return 2
    }

    __do_intersect__(point_start1, point_target1, point_start2, point_target2) {
        const orient1 = this.__orientation__(point_start1, point_target1, point_start2)
        const orient2 = this.__orientation__(point_start1, point_target1, point_target2)
        const orient3 = this.__orientation__(point_start2, point_target2, point_start1)
        const orient4 = this.__orientation__(point_start2, point_target2, point_target1)

        if ((orient1 != orient2) && (orient3 != orient4))
            return true
        if (orient1 === 0 && this.__on_segment__(point_start1, point_start2, point_target1))
            return true
        if (orient2 === 0 && this.__on_segment__(point_start1, point_target2, point_target1))
            return true
        if (orient3 === 0 && this.__on_segment__(point_start2, point_start1, point_target2))
            return true
        if (orient4 === 0 && this.__on_segment__(point_start2, point_target1, point_target2))
            return true
        return false
    }

    is_inside(polygan, point) {
        const length_polygon = polygan.length
        if (length_polygon < 3)
            return false
        const point_extreme = [10000000, point[1]]

        let [result, counter] = [0, 0]
        do {            
            let next = (counter + 1) % length_polygon
            if (this.__do_intersect__(polygan[counter], polygan[next], point, point_extreme)) {
                if (this.__orientation__(polygan[counter], point, polygan[next]) === 0)
                    return this.__on_segment__(polygan[counter], point, polygan[next])
                result += 1
            }
            counter = next
        }
        while (counter != 0)

        return (result % 2) === 1
    }

}
