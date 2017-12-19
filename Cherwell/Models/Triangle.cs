using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Drawing;

namespace Tom.Toppel.Models
{
    public class Triangle : object
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public Point V1 { get; set; }
        public Point V2 { get; set; }
        public Point V3 { get; set; }

        public Triangle()
        {
        }

        public Triangle(Point v1, Point v2, Point v3, string name)
        {
            this.V1 = v1;
            this.V2 = v2;
            this.V3 = v3;
            this.Name = name;
        }
        
        public List<Point> getPoints()
        {
            return new List<Point>
            {
                V1,
                V2,
                V3
            };
        }

        /**
         * If the test object has all the same points (in any order) it is the same rectangle.
         */
        public override bool Equals(Object obj)
        {
            // Check for null values and compare run-time types.
            if (obj == null || GetType() != obj.GetType())
                return false;
            Triangle t = (Triangle)obj;
            List<Point> list = getPoints();
            list.Remove(t.V1);
            list.Remove(t.V2);
            list.Remove(t.V3);
            return list.Count == 0; // equals if list is empty
        }

    }
}
