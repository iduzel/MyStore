import React, { useContext } from "react";
import { DataContext } from "../../pages/context/Context";

const SideCategory = () => {
  const { categoryData, setCategoryData } = useContext(DataContext);
  //console.log('cd',categoryData)

  //const navigate = useNavigate();
  return (
    <div className="sideCategory">
      <div className="widget">
        <h3 className="mb-3">Categories</h3>

        <div className="widget-category">
          {categoryData?.map((item, index) => {
            return (
              <a href="#">
                {item.name}
                <span>(7)</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideCategory;
