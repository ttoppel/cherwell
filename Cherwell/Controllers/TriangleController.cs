using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Tom.Toppel.Models;
using System.Linq;
using System;
using Microsoft.Rest;
using System.Drawing;

namespace Tom.Toppel.Controllers
{
     [Route("api/[controller]")]
    public class TriangleController : Controller
    {
        public const int HEIGHT_PIXS = 10;
        public const int WIDTH_PIXS = 10;
        public const int MAX_ROW_INDEX = 5;
        public const int MAX_COL_INDEX = 11;

        private readonly TriangleContext _context;

        public TriangleController(TriangleContext context)
        {
            _context = context;

            if (_context.TriangleItems.Count() == 0)
            {
                foreach (var value in Enum.GetValues(typeof(RowEnum)))
                {
                    string rowName = value.ToString();
                    int iRow = RowAsInt(rowName) - 1; // adjust for zero based
                    for (int iCol = 0; iCol <= MAX_COL_INDEX; iCol++)
                    {
                        Triangle t = TriangleFromRowColIndex(iRow, iCol, rowName + (iCol + 1));
                        _context.TriangleItems.Add(t);
                    }
                }
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Triangle> GetAll()
        {
            return _context.TriangleItems.ToList();
        }



        /**
         * 1.A - The task, calculate the triangle coordinates for an image with right triangles such that for a given row (A-F) and column (1-12) you can produce any of the triangles
         */
        [HttpGet("{row}/{col}", Name = "GetTriangle")]
        public IActionResult GetTriangleByRowCol(string row, int col)
        {
            Triangle t = null;
            try
            {
                row = row.ToUpper().Trim();
                int iRow = RowAsInt(row) - 1; // adjust for zero based
                int iCol = col - 1; // adjust for zero based

                if (iRow < 0 || iRow > MAX_ROW_INDEX || iCol < 0 || iCol > MAX_COL_INDEX)
                {
                    return NotFound(); // non-specific error processing TODO: Make more specific
                }
                t = TriangleFromRowColIndex(iRow, iCol, row + col);
            }
            catch (Exception e)
            {
                return NotFound();
            }
            return new ObjectResult(t);
        }

        /**
         * 1.B - Lastly, given the vertex coordinates, calculate the row and column for the triangle
         */
        [HttpPost("", Name = "GetRowColumn")]
        public IActionResult GetRowColumnByCoordinates([FromBody] Triangle coordinates)
        {
            if (coordinates == null)
            {
                return BadRequest();
            }
            Triangle tResult = null;

            if (!string.IsNullOrEmpty(coordinates.Name))
            {
                // Row/Column name was provided, get by name E.G. D11
                tResult = _context.TriangleItems.First(t => t.Name == coordinates.Name);
            }

            if (tResult == null)
            {
                // Find by Coordinates (V1, V2, V3 in any order)
                foreach(Triangle t in _context.TriangleItems.ToList())
                {
                    if (t.Equals(coordinates))
                    {
                        tResult = t;
                        break;
                    }
                }
            }
            if (tResult == null)
            {
                return NotFound();
            }
            return new ObjectResult(tResult);
        }

        private Triangle TriangleFromRowColIndex(int iRow, int iCol, string name)
        {
            int xRef = (iCol /2) * WIDTH_PIXS;
            int yRef = iRow * HEIGHT_PIXS;
            Rectangle cellRect = new Rectangle(xRef, yRef, WIDTH_PIXS, HEIGHT_PIXS);

            bool isBottomCorner = iCol % 2 == 0; // are we going to use the bottom left corner or top right corner?

            // right angle corner point
            Point v1 = new Point(isBottomCorner ? cellRect.Left : cellRect.Right, isBottomCorner ? cellRect.Bottom : cellRect.Top);

            // height from v1
            Point v2 = new Point(cellRect.Left, cellRect.Top);

            // width from v1
            Point v3 = new Point(cellRect.Right, cellRect.Bottom);

            return new Triangle(v1, v2, v3, name);
        }

        public int RowAsInt(string rowName)
        {
            return (int)(RowEnum)Enum.Parse(typeof(RowEnum), rowName);
        }
    }
}

