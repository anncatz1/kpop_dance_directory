import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }
`;

function Select({ options, value, onChange, field, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
