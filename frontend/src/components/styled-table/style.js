import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

import { colors } from '../../config/theme';

import { parse } from '../../util/styled-components/font-size';


const EditIcon = styled(FaPen)`
    color: ${colors.black};
    width: 24px;
    height: 24px;
    display: none;
    
    &:hover {
      color: ${colors.green};
    }
`;
const TrashIcon = styled(FaTrashAlt)`
    color: ${colors.black};
    width: 24px;
    height: 24px;
    display: none;
    
    &:hover {
      color: ${colors.red};
    }
`;

const Table = styled(ReactTable)`
    border: unset !important;
    height: 609px;
    overflow: hidden;
    width: 100%;
    
    * {
        border: unset !important;
    }
    
    .rt-thead {
        box-shadow: unset !important;
        //height: 40px;
        max-width: 100% !important;
        min-width: 100% !important;
        background: ${colors.light_black};
        border-radius: 25px 25px 0 0;
        padding: 4px;
        height: 55px;
        display: flex;
        
        .rt-tr {
          align-items: center;
            .rt-th {
                background: transparent;
                color: ${colors.white};
                font-size: ${parse(18)};
                font-weight: bold;
                padding-left: 42px;
                text-align: left;
                position:relative;
                
                &.-sort-asc {
                  box-shadow: unset;
                  
                  &::after {
                      width: 0; 
                      height: 0; 
                      border-left: 10px solid transparent;
                      border-right: 10px solid transparent;
                      
                      border-bottom: 10px solid #fff;
                      content: " ";
                      position: absolute;
                      right: 20px;
                      top: 0;
                  }
                }
                
                &.-sort-desc {
                  box-shadow: unset;
                  
                  &::after {
                      width: 0; 
                      height: 0; 
                      border-left: 10px solid transparent;
                      border-right: 10px solid transparent;
                      
                      border-top: 10px solid #fff;
                      content: " ";
                      position: absolute;
                      right: 20px;
                      bottom: 0;
                  }
                }
                
                &:first-child{
                    padding-left: ${props => (props.padding_left_first_child ? '25px' : '42px')};
                }
                
                &:last-child {
                    padding-right: 50px;
                    padding-left: 5px;
                }
                
                &:nth-last-child(2) {
                    padding-right: 5px;
                }
            }
        }
    }
    
    .rt-tbody {
        background: ${colors.white};
        border-radius: 0 0 25px 25px;
        height: 100%; 
        max-width: 100% !important;
        min-width: 100% !important;
        overflow: auto;
        padding: 19.5px 0;
        
        .rt-tr-group {
            flex: unset;
            height: 55px;

            .rt-tr{
                align-items: center;
                display: flex;
                
                &.-even{
                    background-color: ${colors.more_light_grey};
                }
                
                &:hover .rt-td{
                    li.submenu{
                        color: ${colors.black};
                        display: block;
                    }
                                        
                    color: ${colors.red};
                    cursor: pointer;
                    
                    ${EditIcon},
                    ${TrashIcon}{
                        display: block;
                    }  
                }
                
                .rt-td {
                    align-items: center;
                    background: transparent;
                    color: ${colors.black};
                    display: flex;
                    font-size: ${parse(16)};
                    font-weight: bold;
                    height: 55px;
                    overflow: visible !important;
                    padding-left: 42px;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    
                    *::before {
                        font-size: 26px !important;
                    }
                    
                    width: 100%;

                    &:first-child{
                        padding-left: ${props => (props.padding_left_first_child ? '25px' : '42px')};
                    }
                    
                    &:last-child {
                        padding-right: 50px;
                        justify-content: center;
                        padding-left: 5px;
                    }
                    
                    &:nth-last-child(2) {
                        justify-content: center;
                        padding-right: 5px;
                    }
                    
                    li.submenu{
                        display: none;
                    }
                }                
            }
        }
    }    
`;

export {
    Table, EditIcon, TrashIcon,
};
