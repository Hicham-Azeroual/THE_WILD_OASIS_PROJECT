import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Add "..." for overflow */
  max-width: 100%; /* Ensure it doesn’t exceed column width */
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 100%; /* Limit width to prevent overflow */

  & span:first-child {
    font-weight: 500;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Add "..." for overflow */
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Add "..." for overflow */
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add "..." for overflow */
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          → {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} —{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
    </Table.Row>
  );
}

export default BookingRow;
